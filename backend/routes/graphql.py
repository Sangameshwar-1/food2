from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from graphql import graphql_sync
from schema import schema

graphql_bp = Blueprint('graphql', __name__)

@graphql_bp.route('/graphql', methods=['POST'])
@jwt_required()
def graphql_server():
    data = request.get_json()
    query = data.get('query')
    variables = data.get('variables')
    
    result = graphql_sync(schema, query, variable_values=variables)
    
    return jsonify(result.data), 200 if not result.errors else 400

@graphql_bp.route('/graphiql')
def graphiql():
    return '''
    <!DOCTYPE html>
    <html>
    <head>
        <title>GraphiQL</title>
        <link href="https://unpkg.com/graphiql/graphiql.min.css" rel="stylesheet" />
    </head>
    <body style="margin: 0;">
        <div id="graphiql" style="height: 100vh;"></div>
        <script src="https://unpkg.com/react/umd/react.production.min.js"></script>
        <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"></script>
        <script src="https://unpkg.com/graphiql/graphiql.min.js"></script>
        <script>
            const graphQLFetcher = graphQLParams =>
                fetch('/api/graphql', {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify(graphQLParams),
                })
                .then(response => response.json())
                .catch(error => console.error(error));
            
            ReactDOM.render(
                React.createElement(GraphiQL, { fetcher: graphQLFetcher }),
                document.getElementById('graphiql'),
            );
        </script>
    </body>
    </html>
    '''
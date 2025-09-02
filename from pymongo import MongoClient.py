from pymongo import MongoClient

# connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")

# create/use database
db = client["myDatabase"]

# create/use collection
students = db["students"]

# insert document
students.insert_one({"name": "Ravi", "age": 21, "branch": "ECE"})

# find documents
for student in students.find():
    print(student)

import graphene
from graphene_mongo import MongoengineObjectType
from models.user import User
from models.donor import Donor
from models.volunteer import Volunteer
from models.student import Student

class UserType(MongoengineObjectType):
    class Meta:
        model = User

class DonorType(MongoengineObjectType):
    class Meta:
        model = Donor

class VolunteerType(MongoengineObjectType):
    class Meta:
        model = Volunteer

class StudentType(MongoengineObjectType):
    class Meta:
        model = Student

class Query(graphene.ObjectType):
    users = graphene.List(UserType)
    user = graphene.Field(UserType, id=graphene.String())
    
    donors = graphene.List(DonorType)
    donor = graphene.Field(DonorType, id=graphene.String())
    
    volunteers = graphene.List(VolunteerType)
    volunteer = graphene.Field(VolunteerType, id=graphene.String())
    
    students = graphene.List(StudentType)
    student = graphene.Field(StudentType, id=graphene.String())

    def resolve_users(self, info):
        return User.objects.all()

    def resolve_user(self, info, id):
        return User.objects.get(id=id)

    def resolve_donors(self, info):
        return Donor.objects.all()

    def resolve_donor(self, info, id):
        return Donor.objects.get(id=id)

    def resolve_volunteers(self, info):
        return Volunteer.objects.all()

    def resolve_volunteer(self, info, id):
        return Volunteer.objects.get(id=id)

    def resolve_students(self, info):
        return Student.objects.all()

    def resolve_student(self, info, id):
        return Student.objects.get(id=id)

class CreateUser(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)
        name = graphene.String()
        contact = graphene.String()
        address = graphene.String()

    user = graphene.Field(UserType)

    def mutate(self, info, email, password, **kwargs):
        user = User(email=email, password=password, **kwargs)
        user.hash_password()
        user.save()
        return CreateUser(user=user)

class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
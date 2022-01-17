from gino import Gino

db = Gino()


class UserOrganization(db.Model):
    __tablename__ = "user_organization"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.String, nullable=False)
    organization_id = db.Column(db.Integer, nullable=False)
    is_owner = db.Column(db.Boolean, default=False)
    is_member = db.Column(db.Boolean, default=False)

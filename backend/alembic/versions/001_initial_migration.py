"""Initial migration

Revision ID: 001
Revises: 
Create Date: 2024

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql
from uuid import uuid4

# revision identifiers
revision = '001'
down_revision = None
branch_labels = None
target_revision = None


def upgrade() -> None:
    # Users table
    op.create_table('users',
    sa.Column('id', postgresql.UUID(as_uuid=True), server_default=str(uuid4()), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('hashed_password', sa.String(), nullable=False),
    sa.Column('role', sa.Enum('guest', 'user', 'admin', name='userrole'), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username'),
    sa.Index('ix_users_email', 'email'),
    sa.Index('ix_users_username', 'username')
    )
    
    # User progress
    op.create_table('user_progress',
    sa.Column('id', postgresql.UUID(as_uuid=True), server_default=str(uuid4()), nullable=False),
    sa.Column('user_id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('track_id', sa.String(length=20), nullable=False),
    sa.Column('question_id', sa.Integer(), nullable=False),
    sa.Column('completed_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.Index('ix_user_progress_track_id', 'track_id'),
    sa.Index('ix_user_progress_user_id', 'user_id')
    )
    
    # Leaderboards
    op.create_table('leaderboards',
    sa.Column('id', postgresql.UUID(as_uuid=True), server_default=str(uuid4()), nullable=False),
    sa.Column('user_id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('track_id', sa.String(length=20), nullable=False),
    sa.Column('score', sa.Integer(), server_default='0', nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.Index('ix_leaderboards_track_id', 'track_id'),
    sa.Index('ix_leaderboards_user_id', 'user_id')
    )


def downgrade() -> None:
    op.drop_table('leaderboards')
    op.drop_table('user_progress')
    op.drop_table('users')


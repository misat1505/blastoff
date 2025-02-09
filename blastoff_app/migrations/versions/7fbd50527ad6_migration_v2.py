"""Migration v2

Revision ID: 7fbd50527ad6
Revises: a78d365e0c04
Create Date: 2025-01-14 20:42:08.608273

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '7fbd50527ad6'
down_revision: Union[str, None] = 'a78d365e0c04'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('sites', 'country',
               existing_type=sa.VARCHAR(length=100),
               type_=sa.String(length=1000),
               existing_nullable=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('sites', 'country',
               existing_type=sa.String(length=1000),
               type_=sa.VARCHAR(length=100),
               existing_nullable=False)
    # ### end Alembic commands ###

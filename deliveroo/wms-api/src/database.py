import os
from sqlalchemy import create_engine
from env import assert_env_var

assert_env_var('POSTGRES_URL')
DB_URL = os.environ.get('POSTGRES_URL')

db_engine = create_engine(DB_URL)

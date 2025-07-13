# TL;DR;

`cd wms-data-generator && source ./.venv/bin/activate && python -m src.run`

# SQL Fake Data Generator

This project is a simple Python application that generates a large SQL script with fake data using the [Faker](https://faker.readthedocs.io/) library. The generated SQL script contains `INSERT` statements for a sample table and is saved to the `output/` directory with a timestamped filename.

The setup uses modern Python tooling, including `pyproject.toml` for dependency management, and is designed to be run inside a Python virtual environment (VN), following best practices for project isolation.

---

## Features

- Generates SQL `INSERT` statements with fake data (e.g., names, emails, cities)
- Output file is saved in the `output/` directory with a timestamped filename
- Uses [Faker](https://faker.readthedocs.io/) for realistic test data
- Modern Python packaging with `pyproject.toml`
- Easy setup using Python virtual environments

---

## Project Structure

```
sql-fake-generator/
├── pyproject.toml
├── README.md
├── generate.py
└── output/
```

---

## Prerequisites

- Python 3.8 or newer installed on your system  
  Check your version with:
  ```sh
  python --version
  ```

---

## Setup Instructions

### 1. Clone the Repository

```sh
git clone 
cd sql-fake-generator
```

### 2. Create a Python Virtual Environment (VN)

It is recommended to use a virtual environment to keep dependencies isolated from other projects.

#### On Unix/macOS:

```sh
python3 -m venv .venv
```

#### On Windows:

```sh
python -m venv .venv
```

This will create a `.venv` directory in your project folder.

### 3. Activate the Virtual Environment

#### On Unix/macOS:

```sh
source .venv/bin/activate
```

#### On Windows (cmd.exe):

```sh
.venv\Scripts\activate
```

#### On Windows (PowerShell):

```sh
.venv\Scripts\Activate.ps1
```

You should now see `(.venv)` at the start of your terminal prompt, indicating the virtual environment is active.

### 4. Install Project Dependencies

With the virtual environment activated, install dependencies using [pip](https://pip.pypa.io/):

```sh
pip install .
```

This will install all dependencies listed in `pyproject.toml`, including `faker`.

---

## Usage

After setup, you can generate a SQL script by running:

```sh
python generate.py
```

- The script will create an output file in the `output/` directory.
- The filename will be in the format:  
  `wms-YYYYMMDD-HHMMSS.sql`

Example output path:
```
output/wms-20250605-023701.sql
```

---

## Example Output

The generated file will contain SQL statements like:

```sql
INSERT INTO stuff (stuff_id, name, city, email) VALUES (123456, 'John Doe', 'Springfield', 'john.doe@example.com');
```

---

## Deactivating the Virtual Environment

When you're done, you can deactivate the virtual environment by running:

```sh
deactivate
```

---

## Notes

- The `.venv` directory should **not** be committed to version control. Add it to your `.gitignore`.
- You can adjust the number of generated records by changing the `NUM_RECORDS` variable in `generate.py`.


## Additional Resources

- [Python venv documentation][https://docs.python.org/3/library/venv.html]
- [Faker documentation](https://faker.readthedocs.io/)
- [Python Packaging User Guide](https://packaging.python.org/)

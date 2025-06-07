# 🏭 Satisfactory Factory Planner

A powerful backend tool for planning efficient, scalable factories in [Satisfactory](https://www.satisfactorygame.com/). Built with **FastAPI**, **Pydantic**, and **MongoDB**, it calculates machine layouts, smart splits, and reusable production chains — returning interactive graph data ready to visualize in the frontend.

![Python](https://img.shields.io/badge/python-3.10+-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-v0.110.0-green)
![MongoDB](https://img.shields.io/badge/database-MongoDB-brightgreen)
![Tested](https://img.shields.io/badge/tests-Pytest%20+%20Coverage-blue)
![License](https://img.shields.io/github/license/your-username/satisfactory-factory-planner)

---

## ✨ Features

- 🎯 Input target items and production rates
- 🔁 Smart machine reuse & underclocking strategy
- 🧠 Graph planner that optimizes layout by tiers & efficiency
- 📈 Outputs a visual graph tree of machines, splitters, mergers, and items
- 🧪 Fully tested backend with DAL abstraction and mock data
- 🧰 Extendable architecture with config-driven logic

---

## 🗂 Project Structure

```
satisfactory-factory-planner/
├── api/                # FastAPI routes
├── dal/                # Data access layer (Mongo + mocks)
├── models/             # Pydantic models + shared enums
├── services/           # Business logic (planner, demand, split)
├── test_data/          # Mocked graph and item data for local dev
├── tests/              # Pytest-based unit and integration tests
├── main.py             # FastAPI app entry point
├── requirements.txt
└── README.md
```

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Python 3.10+
- MongoDB (local or remote)

### 🔁 Clone and install

```bash
git clone https://github.com/your-username/satisfactory-factory-planner.git
cd satisfactory-factory-planner
pip install -r requirements.txt
```

---

## 🔌 Configuration

Create a `.env` file to configure database connection:

```env
MONGO_URI=mongodb://localhost:27017
DB_NAME=satisfactory
```

---

## ▶️ Running the API

```bash
uvicorn main:app --reload
```

Open your browser at: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 📐 Example API Usage

### POST `/planner/reuse`

**Request:**

```json
{
  "targets": [
    { "item": "smart_plating", "rate": 5 }
  ],
  "tier": 3,
  "reuse": true
}
```

**Response:**

```json
{
  "nodes": [
    {
      "id": "node_1",
      "label": "assembler (smart_plating)\n1.00x",
      "type": "machine",
      "item": "smart_plating",
      "machine": "assembler",
      "count": 1.0
    }
  ],
  "edges": [
    {
      "source": "node_0",
      "target": "node_1",
      "label": "20.00/min"
    }
  ]
}
```

Returns a graph of all machines, resources, and splitters required.

---

## 🧪 Running Tests

```bash
pytest
```

To run specific tests:

```bash
pytest tests/test_demand.py
```

---

## 📦 requirements.txt

```txt
# Core backend
fastapi==0.110.0
uvicorn[standard]==0.29.0
pydantic==2.6.4

# MongoDB async client
motor==3.4.0

# Testing
pytest==8.2.1
mongomock==4.1.2
```

Install dependencies with:

```bash
pip install -r requirements.txt
```

---

## 🔬 Technologies Used

- **FastAPI** — modern Python web framework
- **Pydantic v2** — data modeling & validation
- **Uvicorn** — ASGI server
- **React Flow** — (in frontend) for interactive graph rendering
- **Pytest** — for unit + integration testing

---

## 🧭 Roadmap

- [x] Smart splitting with underclocking
- [x] Machine reuse logic
- [x] Tier-restricted recipes
- [x] DAL abstraction + mock testing
- [ ] Export layouts to in-game schematic format
- [ ] Frontend node editing
- [ ] Power + area usage summary
- [ ] Multiplayer factory collaboration


---

## 📄 License

MIT License © Yogev Shachar

---

## 💬 Contact

For support, ideas, or collaboration, open an issue or reach out on [GitHub](https://github.com/your-username).
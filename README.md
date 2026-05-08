# om-fingerprinter
om-fingerprinter is a web application demonstrating user identification using web browser fingerprinting, developed as part of a bachelor's thesis project.

---

### Project structure
```text
om-fingerprinter/
├───app
│   └───libs
├───resources
│   ├───static
│   │   ├───css
│   │   ├───images
│   │   │   ├───favicons
│   │   │   └───tabler-icons-3.40.0
│   │   └───js
│   │       ├───modules
│   │       └───utils
│   └───templates
│       ├───fp-demo-items
│       └───partials
└───THIRD_PARTY_LICENSES
    ├───jsSHA
    └───TablerIcons
```

___

### Requirements
- Python **3.12** or newer
- pip (latest recommended)
- virtual environment (optional but recommended)
- dependencies defined in `requirements.txt`

---

### Installation
#### Clone the repository
```bash
git clone https://github.com/mol1so/om-fingerprinter.git
cd om-fingerprinter
```

#### Create virtual environment
```bash
python -m venv env
```

##### Linux / macOS
```bash
source ./env/bin/activate
```

##### Windows
```powershell
.\env\Scripts\activate
```

#### Install dependencies
```bash
python -m pip install -r requirements.txt
```

---

### Configure environment variables
Variables used to configure the Flask server:
- `OM_FP_HOST` – Server host IPv4 address
- `OM_FP_PORT` – Server port

---

### Usage
```bash
python __main__.py
```

---

### License
This project is licensed under the terms of the **MIT License**.  
See the [LICENSE](https://github.com/mol1so/om-fingerprinter/blob/main/LICENSE) file for the full license text.

### Third-Party Licenses
This project bundles additional third-party components and licenses:
- **jsSHA** – BSD-3-Clause License
- **Tabler Icons** – MIT License

All third-party licenses (including Python dependencies) are included in `THIRD_PARTY_LICENSES/`
from app import create_app
import os

app = create_app()

if __name__ == "__main__":
    host = os.getenv("OM_FP_HOST") # Example: OM_FP_HOST=127.0.0.1
    port = os.getenv("OM_FP_PORT") # Example: OM_FP_PORT=8080

    if (host is not None) and (port is not None):
        app.run(host=host, port=port, debug=False)
    else:
        print("Error: Please specify the host and port using the environment variables 'OM_FP_HOST' and 'OM_FP_PORT' to run the application.")
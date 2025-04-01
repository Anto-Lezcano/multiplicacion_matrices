from flask import Flask, request, jsonify
from flask_cors import CORS  
import numpy as np

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  

@app.route('/mul', methods=['POST'])
def suma():
    try:
        data = request.get_json()

        m_a = np.array(data["m_a"])
        m_b = np.array(data["m_b"])


        mul = np.matmul(m_a, m_b)

        return jsonify({"resultado": mul.tolist()})

    except Exception as e:
        return jsonify({"error": f"Se produjo un error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=3000)

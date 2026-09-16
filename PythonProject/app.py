from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/cart')
def cart():
    return render_template('cart.html')

@app.route('/favorites')
def favorites():
    return render_template('favorites.html')

@app.route('/orders')
def orders():
    return render_template('orders.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
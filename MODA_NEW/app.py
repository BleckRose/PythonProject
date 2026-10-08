from flask import Flask, render_template

app = Flask(__name__)
app.config['SECRET_KEY'] = 'dev-secret-key-change-in-prod'


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


@app.route('/women')
def women():
    return render_template('women.html')


@app.route('/men')
def men():
    return render_template('men.html')


@app.route('/accessories')
def accessories():
    return render_template('accessories.html')


@app.route('/shoes')
def shoes():
    return render_template('shoes.html')

@app.route('/product/<int:product_id>')
def product(product_id):
    return render_template('product.html', product_id=product_id)


@app.errorhandler(404)
def not_found(e):
    return "<h1 style='font-family:sans-serif;text-align:center;margin-top:100px;'>404 — Страница не найдена</h1><p style='text-align:center;'><a href='/'>← На главную</a></p>", 404


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
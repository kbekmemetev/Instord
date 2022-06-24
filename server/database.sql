CREATE TABLE restaurant(
    restaurant_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    coordinates VARCHAR(255) NOT NULL,
    address VARCHAR(511) NOT NULL,
    work_hours VARCHAR(255) NOT NULL
);

CREATE TABLE menu(
    menu_id SERIAL PRIMARY KEY,
    restaurant_id INTEGER REFERENCES restaurant(restaurant_id) ON DELETE CASCADE NOT NULL
);

CREATE TABLE category(
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    menu_id INTEGER REFERENCES menu(menu_id) ON DELETE CASCADE NOT NULL,
    parent INTEGER
);

CREATE TABLE item(
    item_id SERIAL PRIMARY KEY,
    name VARCHAR(511) NOT NULL,
    description VARCHAR(1000),
    composition VARCHAR(1000),
    price REAL NOT NULL,
    image VARCHAR(255),
    category_id INTEGER REFERENCES category(category_id) ON DELETE CASCADE NOT NULL,
    weight INTEGER NOT NULL,
    is_liquid BOOLEAN NOT NULL DEFAULT false,
    is_allowed_underaged BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE person(
    person_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL DEFAULT 'CLIENT',
    status INTEGER,
    restaurant_id INTEGER,
    reached_majority_age BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE basket(
    basket_id SERIAL PRIMARY KEY,
    person_id INTEGER REFERENCES person(person_id) ON DELETE CASCADE NOT NULL
);

CREATE TABLE basket_item(
    bi_id SERIAL PRIMARY KEY,
    basket_id INTEGER REFERENCES basket(basket_id) ON DELETE CASCADE NOT NULL,
    item_id INTEGER NOT NULL
);

CREATE TABLE orders(
    order_id SERIAL PRIMARY KEY,
    person_id INTEGER REFERENCES person(person_id) NOT NULL ,
    restaurant_id INTEGER REFERENCES restaurant(restaurant_id) NOT NULL,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    table_number INTEGER NOT NULL,
    needs_waiter BOOLEAN NOT NULL DEFAULT false,
    status VARCHAR(255) NOT NULL, 
    total_price REAl
);

CREATE TABLE order_item(
    oi_id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(order_id) ON DELETE CASCADE NOT NULL,
    item_id INTEGER REFERENCES item(item_id) ON DELETE CASCADE NOT NULL,
    time TIME DEFAULT CURRENT_TIME,
    time_ms BIGINT NOT NULL,
    is_served BOOLEAN NOT NULL DEFAULT false
);

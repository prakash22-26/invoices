CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(20) CHECK (role IN ('admin', 'accountant')) NOT NULL
);
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    company VARCHAR(100),
    address TEXT,
    gst_no VARCHAR(20)
);
CREATE TABLE invoices (
    id SERIAL PRIMARY KEY,
    invoice_no VARCHAR(20) UNIQUE NOT NULL,
    client_id INTEGER REFERENCES clients(id),
    status VARCHAR(20) DEFAULT 'Draft',
    tax NUMERIC DEFAULT 0,
    discount NUMERIC DEFAULT 0,
    total NUMERIC DEFAULT 0,
    issue_date DATE,
    due_date DATE,
    created_by INTEGER REFERENCES users(id)
);
CREATE TABLE invoice_items (
    id SERIAL PRIMARY KEY,
    invoice_id INTEGER REFERENCES invoices(id) ON DELETE CASCADE,
    description TEXT,
    qty INTEGER,
    unit_price NUMERIC,
    total NUMERIC
);
INSERT INTO users (id, name, email, password, role)
VALUES (
        id :integer,
        'name:character varying',
        'email:character varying',
        'password:text',
        'role:character varying'
    );
INSERT INTO clients (id, name, email, phone, company, address, gst_no)
VALUES (
        id :integer,
        'name:character varying',
        'email:character varying',
        'phone:character varying',
        'company:character varying',
        'address:text',
        'gst_no:character varying'
    );
INSERT INTO invoices (
        id,
        invoice_no,
        client_id,
        status,
        tax,
        discount,
        total,
        issue_date,
        due_date,
        created_by
    )
VALUES (
        id :integer,
        'invoice_no:character varying',
        client_id :integer,
        'status:character varying',
        tax :numeric,
        discount :numeric,
        total :numeric,
        'issue_date:date',
        'due_date:date',
        created_by :integer
    );
INSERT INTO invoice_items (
        id,
        invoice_id,
        description,
        qty,
        unit_price,
        total
    )
VALUES (
        id :integer,
        invoice_id :integer,
        'description:text',
        qty :integer,
        unit_price :numeric,
        total :numeric
    );
INSERT INTO payments (id, invoice_id, amount, mode, date)
VALUES (
        id :integer,
        invoice_id :integer,
        amount :numeric,
        'mode:character varying',
        'date:date'
    );
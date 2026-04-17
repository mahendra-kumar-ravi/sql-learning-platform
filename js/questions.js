const QUESTIONS = {
  SQL10: [
    {
      id: 1,
      title: "Find All Employees",
      difficulty: "Easy",
      category: "SELECT",
      question: "Retrieve all records from the employees table.",
      hint: "Use SELECT * to fetch all columns.",
      solution: "SELECT * FROM employees;",
      schema: `CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT,
  salary INTEGER,
  department TEXT
);
INSERT INTO employees VALUES (1,'Amit',25000,'HR');
INSERT INTO employees VALUES (2,'Rahul',40000,'Engineering');
INSERT INTO employees VALUES (3,'Neha',50000,'Engineering');
INSERT INTO employees VALUES (4,'Sneha',20000,'Marketing');
INSERT INTO employees VALUES (5,'Vikram',35000,'HR');`,
      expected_columns: ["id","name","salary","department"],
      steps: "Use SELECT * FROM table to return all rows and columns."
    },
    {
      id: 2,
      title: "High Salary Employees",
      difficulty: "Easy",
      category: "WHERE",
      question: "Find all employees whose salary is greater than 30000.",
      hint: "Use the WHERE clause to filter rows by salary.",
      solution: "SELECT * FROM employees WHERE salary > 30000;",
      schema: `CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT,
  salary INTEGER,
  department TEXT
);
INSERT INTO employees VALUES (1,'Amit',25000,'HR');
INSERT INTO employees VALUES (2,'Rahul',40000,'Engineering');
INSERT INTO employees VALUES (3,'Neha',50000,'Engineering');
INSERT INTO employees VALUES (4,'Sneha',20000,'Marketing');
INSERT INTO employees VALUES (5,'Vikram',35000,'HR');`,
      expected_columns: ["id","name","salary","department"],
      steps: "Filter rows where salary > 30000 using WHERE clause."
    },
    {
      id: 3,
      title: "Engineering Department",
      difficulty: "Easy",
      category: "WHERE",
      question: "List all employees who work in the Engineering department.",
      hint: "Use WHERE department = 'Engineering'",
      solution: "SELECT * FROM employees WHERE department = 'Engineering';",
      schema: `CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT,
  salary INTEGER,
  department TEXT
);
INSERT INTO employees VALUES (1,'Amit',25000,'HR');
INSERT INTO employees VALUES (2,'Rahul',40000,'Engineering');
INSERT INTO employees VALUES (3,'Neha',50000,'Engineering');
INSERT INTO employees VALUES (4,'Sneha',20000,'Marketing');
INSERT INTO employees VALUES (5,'Vikram',35000,'HR');`,
      expected_columns: ["id","name","salary","department"],
      steps: "Filter by department column using a string comparison."
    },
    {
      id: 4,
      title: "Count All Employees",
      difficulty: "Easy",
      category: "Aggregation",
      question: "Find the total number of employees in the company.",
      hint: "Use COUNT(*) to count rows.",
      solution: "SELECT COUNT(*) AS total_employees FROM employees;",
      schema: `CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT,
  salary INTEGER,
  department TEXT
);
INSERT INTO employees VALUES (1,'Amit',25000,'HR');
INSERT INTO employees VALUES (2,'Rahul',40000,'Engineering');
INSERT INTO employees VALUES (3,'Neha',50000,'Engineering');
INSERT INTO employees VALUES (4,'Sneha',20000,'Marketing');
INSERT INTO employees VALUES (5,'Vikram',35000,'HR');`,
      expected_columns: ["total_employees"],
      steps: "Use COUNT(*) aggregate function to count all rows."
    },
    {
      id: 5,
      title: "Average Salary",
      difficulty: "Easy",
      category: "Aggregation",
      question: "Calculate the average salary of all employees.",
      hint: "Use AVG() function on the salary column.",
      solution: "SELECT AVG(salary) AS avg_salary FROM employees;",
      schema: `CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT,
  salary INTEGER,
  department TEXT
);
INSERT INTO employees VALUES (1,'Amit',25000,'HR');
INSERT INTO employees VALUES (2,'Rahul',40000,'Engineering');
INSERT INTO employees VALUES (3,'Neha',50000,'Engineering');
INSERT INTO employees VALUES (4,'Sneha',20000,'Marketing');
INSERT INTO employees VALUES (5,'Vikram',35000,'HR');`,
      expected_columns: ["avg_salary"],
      steps: "AVG() computes the mean of a numeric column."
    },
    {
      id: 6,
      title: "Sort by Salary",
      difficulty: "Easy",
      category: "ORDER BY",
      question: "List all employees sorted by salary in descending order.",
      hint: "Use ORDER BY salary DESC.",
      solution: "SELECT * FROM employees ORDER BY salary DESC;",
      schema: `CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT,
  salary INTEGER,
  department TEXT
);
INSERT INTO employees VALUES (1,'Amit',25000,'HR');
INSERT INTO employees VALUES (2,'Rahul',40000,'Engineering');
INSERT INTO employees VALUES (3,'Neha',50000,'Engineering');
INSERT INTO employees VALUES (4,'Sneha',20000,'Marketing');
INSERT INTO employees VALUES (5,'Vikram',35000,'HR');`,
      expected_columns: ["id","name","salary","department"],
      steps: "ORDER BY sorts results. DESC = highest first."
    },
    {
      id: 7,
      title: "Unique Departments",
      difficulty: "Easy",
      category: "DISTINCT",
      question: "Find all unique department names in the company.",
      hint: "Use SELECT DISTINCT on the department column.",
      solution: "SELECT DISTINCT department FROM employees;",
      schema: `CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT,
  salary INTEGER,
  department TEXT
);
INSERT INTO employees VALUES (1,'Amit',25000,'HR');
INSERT INTO employees VALUES (2,'Rahul',40000,'Engineering');
INSERT INTO employees VALUES (3,'Neha',50000,'Engineering');
INSERT INTO employees VALUES (4,'Sneha',20000,'Marketing');
INSERT INTO employees VALUES (5,'Vikram',35000,'HR');`,
      expected_columns: ["department"],
      steps: "DISTINCT removes duplicate values from results."
    },
    {
      id: 8,
      title: "Employees Per Department",
      difficulty: "Medium",
      category: "GROUP BY",
      question: "Count how many employees are in each department.",
      hint: "Use GROUP BY with COUNT(*).",
      solution: "SELECT department, COUNT(*) AS count FROM employees GROUP BY department;",
      schema: `CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT,
  salary INTEGER,
  department TEXT
);
INSERT INTO employees VALUES (1,'Amit',25000,'HR');
INSERT INTO employees VALUES (2,'Rahul',40000,'Engineering');
INSERT INTO employees VALUES (3,'Neha',50000,'Engineering');
INSERT INTO employees VALUES (4,'Sneha',20000,'Marketing');
INSERT INTO employees VALUES (5,'Vikram',35000,'HR');`,
      expected_columns: ["department","count"],
      steps: "GROUP BY groups rows with the same value. COUNT counts rows in each group."
    },
    {
      id: 9,
      title: "Max Salary Finder",
      difficulty: "Easy",
      category: "Aggregation",
      question: "Find the highest salary among all employees.",
      hint: "Use MAX() on the salary column.",
      solution: "SELECT MAX(salary) AS max_salary FROM employees;",
      schema: `CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT,
  salary INTEGER,
  department TEXT
);
INSERT INTO employees VALUES (1,'Amit',25000,'HR');
INSERT INTO employees VALUES (2,'Rahul',40000,'Engineering');
INSERT INTO employees VALUES (3,'Neha',50000,'Engineering');
INSERT INTO employees VALUES (4,'Sneha',20000,'Marketing');
INSERT INTO employees VALUES (5,'Vikram',35000,'HR');`,
      expected_columns: ["max_salary"],
      steps: "MAX() returns the largest value in a column."
    },
    {
      id: 10,
      title: "Top 3 Earners",
      difficulty: "Medium",
      category: "LIMIT",
      question: "Find the top 3 highest paid employees.",
      hint: "Use ORDER BY salary DESC then LIMIT 3.",
      solution: "SELECT * FROM employees ORDER BY salary DESC LIMIT 3;",
      schema: `CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT,
  salary INTEGER,
  department TEXT
);
INSERT INTO employees VALUES (1,'Amit',25000,'HR');
INSERT INTO employees VALUES (2,'Rahul',40000,'Engineering');
INSERT INTO employees VALUES (3,'Neha',50000,'Engineering');
INSERT INTO employees VALUES (4,'Sneha',20000,'Marketing');
INSERT INTO employees VALUES (5,'Vikram',35000,'HR');`,
      expected_columns: ["id","name","salary","department"],
      steps: "Combine ORDER BY and LIMIT to get top N results."
    }
  ],

  SQL50: [
    {
      id: 11,
      title: "Departments With High Avg Salary",
      difficulty: "Medium",
      category: "HAVING",
      question: "Find departments where the average salary is above 35000.",
      hint: "Use GROUP BY with HAVING AVG(salary) > 35000.",
      solution: "SELECT department, AVG(salary) AS avg_salary FROM employees GROUP BY department HAVING AVG(salary) > 35000;",
      schema: `CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT,
  salary INTEGER,
  department TEXT
);
INSERT INTO employees VALUES (1,'Amit',25000,'HR');
INSERT INTO employees VALUES (2,'Rahul',40000,'Engineering');
INSERT INTO employees VALUES (3,'Neha',50000,'Engineering');
INSERT INTO employees VALUES (4,'Sneha',20000,'Marketing');
INSERT INTO employees VALUES (5,'Vikram',35000,'HR');`,
      expected_columns: ["department","avg_salary"],
      steps: "HAVING filters after GROUP BY, unlike WHERE which filters before."
    },
    {
      id: 12,
      title: "Employee Orders",
      difficulty: "Medium",
      category: "JOIN",
      question: "List each employee name along with the count of orders they have placed.",
      hint: "Use LEFT JOIN between employees and orders, then GROUP BY.",
      solution: "SELECT e.name, COUNT(o.id) AS order_count FROM employees e LEFT JOIN orders o ON e.id = o.employee_id GROUP BY e.id, e.name;",
      schema: `CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT,
  salary INTEGER,
  department TEXT
);
INSERT INTO employees VALUES (1,'Amit',25000,'HR');
INSERT INTO employees VALUES (2,'Rahul',40000,'Engineering');
INSERT INTO employees VALUES (3,'Neha',50000,'Engineering');
INSERT INTO employees VALUES (4,'Sneha',20000,'Marketing');
INSERT INTO employees VALUES (5,'Vikram',35000,'HR');

CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  employee_id INTEGER,
  amount INTEGER,
  order_date TEXT
);
INSERT INTO orders VALUES (1,2,5000,'2024-01-10');
INSERT INTO orders VALUES (2,2,3000,'2024-01-15');
INSERT INTO orders VALUES (3,3,8000,'2024-02-01');
INSERT INTO orders VALUES (4,1,1500,'2024-02-05');`,
      expected_columns: ["name","order_count"],
      steps: "LEFT JOIN returns all employees even if they have no orders. COUNT(o.id) counts only non-null order ids."
    },
    {
      id: 13,
      title: "CASE Salary Bands",
      difficulty: "Medium",
      category: "CASE WHEN",
      question: "Classify each employee as 'High', 'Mid', or 'Low' earner based on salary.",
      hint: "Use CASE WHEN salary > 40000 THEN ... END.",
      solution: `SELECT name, salary,
  CASE
    WHEN salary >= 40000 THEN 'High'
    WHEN salary >= 30000 THEN 'Mid'
    ELSE 'Low'
  END AS band
FROM employees;`,
      schema: `CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT,
  salary INTEGER,
  department TEXT
);
INSERT INTO employees VALUES (1,'Amit',25000,'HR');
INSERT INTO employees VALUES (2,'Rahul',40000,'Engineering');
INSERT INTO employees VALUES (3,'Neha',50000,'Engineering');
INSERT INTO employees VALUES (4,'Sneha',20000,'Marketing');
INSERT INTO employees VALUES (5,'Vikram',35000,'HR');`,
      expected_columns: ["name","salary","band"],
      steps: "CASE WHEN works like if-else. Each WHEN condition is checked in order."
    },
    {
      id: 14,
      title: "Subquery: Above Average",
      difficulty: "Hard",
      category: "Subquery",
      question: "Find all employees earning above the company average salary.",
      hint: "Use a subquery inside WHERE: WHERE salary > (SELECT AVG ...)",
      solution: "SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);",
      schema: `CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT,
  salary INTEGER,
  department TEXT
);
INSERT INTO employees VALUES (1,'Amit',25000,'HR');
INSERT INTO employees VALUES (2,'Rahul',40000,'Engineering');
INSERT INTO employees VALUES (3,'Neha',50000,'Engineering');
INSERT INTO employees VALUES (4,'Sneha',20000,'Marketing');
INSERT INTO employees VALUES (5,'Vikram',35000,'HR');`,
      expected_columns: ["id","name","salary","department"],
      steps: "A subquery runs first and returns a single value used by the outer query."
    },
    {
      id: 15,
      title: "Total Order Value Per Employee",
      difficulty: "Medium",
      category: "JOIN + GROUP BY",
      question: "Find the total order amount for each employee. Show employee name and total.",
      hint: "JOIN employees and orders, then SUM(amount) grouped by employee.",
      solution: "SELECT e.name, SUM(o.amount) AS total FROM employees e JOIN orders o ON e.id = o.employee_id GROUP BY e.id, e.name;",
      schema: `CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT,
  salary INTEGER,
  department TEXT
);
INSERT INTO employees VALUES (1,'Amit',25000,'HR');
INSERT INTO employees VALUES (2,'Rahul',40000,'Engineering');
INSERT INTO employees VALUES (3,'Neha',50000,'Engineering');
INSERT INTO employees VALUES (4,'Sneha',20000,'Marketing');
INSERT INTO employees VALUES (5,'Vikram',35000,'HR');

CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  employee_id INTEGER,
  amount INTEGER,
  order_date TEXT
);
INSERT INTO orders VALUES (1,2,5000,'2024-01-10');
INSERT INTO orders VALUES (2,2,3000,'2024-01-15');
INSERT INTO orders VALUES (3,3,8000,'2024-02-01');
INSERT INTO orders VALUES (4,1,1500,'2024-02-05');`,
      expected_columns: ["name","total"],
      steps: "INNER JOIN links matching rows. SUM aggregates the amount per group."
    }
  ],

  SQL75_Analyst: [
    {
      id: 21,
      title: "Monthly Sales Summary",
      difficulty: "Medium",
      category: "GROUP BY + DATE",
      question: "Calculate total sales amount per month from the orders table.",
      hint: "Use strftime('%Y-%m', order_date) to extract year-month.",
      solution: "SELECT strftime('%Y-%m', order_date) AS month, SUM(amount) AS total_sales FROM orders GROUP BY month ORDER BY month;",
      schema: `CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  employee_id INTEGER,
  amount INTEGER,
  order_date TEXT
);
INSERT INTO orders VALUES (1,2,5000,'2024-01-10');
INSERT INTO orders VALUES (2,2,3000,'2024-01-15');
INSERT INTO orders VALUES (3,3,8000,'2024-02-01');
INSERT INTO orders VALUES (4,1,1500,'2024-02-05');
INSERT INTO orders VALUES (5,3,4000,'2024-02-20');`,
      expected_columns: ["month","total_sales"],
      steps: "Extract date part using strftime, then GROUP BY the extracted value."
    },
    {
      id: 22,
      title: "Running Total (Window)",
      difficulty: "Hard",
      category: "Window Functions",
      question: "Calculate a running total of order amounts ordered by date.",
      hint: "Use SUM() OVER (ORDER BY order_date).",
      solution: "SELECT id, order_date, amount, SUM(amount) OVER (ORDER BY order_date) AS running_total FROM orders;",
      schema: `CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  employee_id INTEGER,
  amount INTEGER,
  order_date TEXT
);
INSERT INTO orders VALUES (1,2,5000,'2024-01-10');
INSERT INTO orders VALUES (2,2,3000,'2024-01-15');
INSERT INTO orders VALUES (3,3,8000,'2024-02-01');
INSERT INTO orders VALUES (4,1,1500,'2024-02-05');
INSERT INTO orders VALUES (5,3,4000,'2024-02-20');`,
      expected_columns: ["id","order_date","amount","running_total"],
      steps: "Window functions compute across a set of rows without collapsing them. OVER defines the window."
    },
    {
      id: 23,
      title: "Rank Employees by Salary",
      difficulty: "Hard",
      category: "Window Functions",
      question: "Rank all employees by salary from highest to lowest using RANK().",
      hint: "Use RANK() OVER (ORDER BY salary DESC).",
      solution: "SELECT name, salary, RANK() OVER (ORDER BY salary DESC) AS salary_rank FROM employees;",
      schema: `CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT,
  salary INTEGER,
  department TEXT
);
INSERT INTO employees VALUES (1,'Amit',25000,'HR');
INSERT INTO employees VALUES (2,'Rahul',40000,'Engineering');
INSERT INTO employees VALUES (3,'Neha',50000,'Engineering');
INSERT INTO employees VALUES (4,'Sneha',20000,'Marketing');
INSERT INTO employees VALUES (5,'Vikram',35000,'HR');`,
      expected_columns: ["name","salary","salary_rank"],
      steps: "RANK() assigns rank numbers. Ties get the same rank and the next rank is skipped."
    }
  ],

  SQL75_Engineer: [
    {
      id: 31,
      title: "CTE: Department Summary",
      difficulty: "Hard",
      category: "CTE",
      question: "Use a CTE to first calculate average salary per department, then find departments above overall average.",
      hint: "WITH dept_avg AS (...) SELECT ... FROM dept_avg WHERE ...",
      solution: `WITH dept_avg AS (
  SELECT department, AVG(salary) AS avg_sal
  FROM employees
  GROUP BY department
)
SELECT department, avg_sal
FROM dept_avg
WHERE avg_sal > (SELECT AVG(salary) FROM employees);`,
      schema: `CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT,
  salary INTEGER,
  department TEXT
);
INSERT INTO employees VALUES (1,'Amit',25000,'HR');
INSERT INTO employees VALUES (2,'Rahul',40000,'Engineering');
INSERT INTO employees VALUES (3,'Neha',50000,'Engineering');
INSERT INTO employees VALUES (4,'Sneha',20000,'Marketing');
INSERT INTO employees VALUES (5,'Vikram',35000,'HR');`,
      expected_columns: ["department","avg_sal"],
      steps: "CTEs (WITH clause) create a named temporary result you can query like a table."
    },
    {
      id: 32,
      title: "Self Join: Manager Lookup",
      difficulty: "Hard",
      category: "Self JOIN",
      question: "List each employee alongside their manager's name.",
      hint: "Join the employees table to itself using manager_id = id.",
      solution: "SELECT e.name AS employee, m.name AS manager FROM employees e LEFT JOIN employees m ON e.manager_id = m.id;",
      schema: `CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT,
  salary INTEGER,
  department TEXT,
  manager_id INTEGER
);
INSERT INTO employees VALUES (1,'Amit',25000,'HR',NULL);
INSERT INTO employees VALUES (2,'Rahul',40000,'Engineering',1);
INSERT INTO employees VALUES (3,'Neha',50000,'Engineering',1);
INSERT INTO employees VALUES (4,'Sneha',20000,'Marketing',2);
INSERT INTO employees VALUES (5,'Vikram',35000,'HR',1);`,
      expected_columns: ["employee","manager"],
      steps: "A self JOIN joins a table to itself using different aliases. Useful for hierarchical data."
    }
  ]
};

const TRACKS = [
  {
    id: "SQL10",
    name: "SQL10",
    tagline: "Beginner Level",
    desc: "Master the fundamentals — SELECT, WHERE, ORDER BY, and basic aggregations.",
    icon: "🌱",
    color: "#22c55e",
    count: 10,
    roles: ["All"]
  },
  {
    id: "SQL50",
    name: "SQL50",
    tagline: "Interview Prep",
    desc: "Tackle JOINs, subqueries, CASE WHEN, and GROUP BY for real interviews.",
    icon: "⚡",
    color: "#f59e0b",
    count: 5,
    roles: ["Data Analyst", "Data Engineer"]
  },
  {
    id: "SQL75_Analyst",
    name: "SQL75",
    tagline: "Data Analyst Track",
    desc: "Analytics-focused: aggregations, window functions, and business reporting.",
    icon: "📊",
    color: "#3b82f6",
    count: 3,
    roles: ["Data Analyst"]
  },
  {
    id: "SQL75_Engineer",
    name: "SQL75",
    tagline: "Data Engineer Track",
    desc: "Engineering-focused: CTEs, self JOINs, performance, and complex queries.",
    icon: "⚙️",
    color: "#8b5cf6",
    count: 2,
    roles: ["Data Engineer"]
  }
];

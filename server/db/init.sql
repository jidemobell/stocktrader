-- checks if a stock_details table exists and creates it if not

CREATE TABLE IF NOT EXISTS stock_details (
  company_id TEXT UNIQUE,
  country TEXT[],
  budget NUMERIC(10,2),
  bid NUMERIC(10,2),
  category TEXT[],
  PRIMARY KEY (company_id)
);





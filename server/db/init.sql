-- check for non sensitive case
--- create list for ocuntry and category

CREATE TABLE IF NOT EXISTS stock_details (
 company_id TEXT UNIQUE,
  country TEXT,
  budget INTEGER,
  bid INTEGER,
  category TEXT,
  PRIMARY KEY (company_id)
);



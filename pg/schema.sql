CREATE TABLE buildings (
  id       UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date     DATE,       
  type     VARCHAR,
  color    VARCHAR
);

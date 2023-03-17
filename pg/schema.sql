CREATE TABLE buildings (
  id       UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date     timestamptz,       
  type     VARCHAR,
  color    VARCHAR
);


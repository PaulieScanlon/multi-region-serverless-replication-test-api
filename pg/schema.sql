CREATE TABLE buildings (
  id       UUID DEFAULT gen_random_uuid() PRIMARY KEY,       
  type     VARCHAR,
  color    VARCHAR
);


INSERT INTO buildings(type, color) VALUES ('skyscraper', '#ff00ff');
INSERT INTO buildings(type, color) VALUES ('skyscraper', '#ffff00');
INSERT INTO buildings(type, color) VALUES ('house', '#00ffff');
INSERT INTO buildings(type, color) VALUES ('office', '#0f0fff');

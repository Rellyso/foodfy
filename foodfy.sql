-- para excluir e recriar esquema em cascata 
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

-- excluir e recriar caso exista a base de dados launchstoredb
DROP DATABASE IF EXISTS foodfy;
CREATE DATABASE foodfy;

CREATE TABLE "files" (
  "id" serial PRIMARY KEY,
  "name" text,
  "path" text NOT NULL
);

-- adicionando tabela chefs
CREATE TABLE "chefs" (
  "id" serial PRIMARY KEY,
  "name" text NOT NULL,
  "file_id" int NOT NULL,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "recipe_files" (
  "id" serial PRIMARY KEY,
  "recipe_id" int NOT NULL,
  "file_id" int NOT NULL
);

CREATE TABLE "recipes" (
  "id" serial PRIMARY KEY,
  "chef_id" int NOT NULL,
  "title" text,
  "ingredients" text[],
  "preparation" text[],
  "information" text,
  "created_at" timestamp DEFAULT (now())
);

-- adicionando default em created_at e updated_at
ALTER TABLE "recipes" ADD COLUMN "updated_at" timestamp DEFAULT (now());
ALTER TABLE "recipes" ALTER "created_at" SET DEFAULT (now());


-- adicionando relacionamentos de recipe_files
ALTER TABLE "recipe_files" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id");
ALTER TABLE "recipe_files" ADD FOREIGN KEY ("file_id") REFERENCES "files" ("id");

-- adicionando relacionamentos de chefs
ALTER TABLE "chefs" ADD FOREIGN KEY ("file_id") REFERENCES "files" ("id");


CREATE TABLE "users" (
  "id" serial PRIMARY KEY,
  "name" text NOT NULL,
  "email" text NOT NULL,
  "password" text NOT NULL,
  "reset_token" text,
  "reset_token_expires" text,
  "is_admin" BOOLEAN DEFAULT false,
  "created_at" TIMESTAMP DEFAULT (now()),
  "updated_at" TIMESTAMP DEFAULT (now())
);

-- adicionando user_id em recipes
ALTER TABLE "recipes" ADD COLUMN "user_id" int NOT NULL;
-- adicionando chave estrangeira em recipes para referenciar id de users
ALTER TABLE "recipes" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");


-- adicionando tabela de sessão de usuário
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" 
ADD CONSTRAINT "session_pkey" 
PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
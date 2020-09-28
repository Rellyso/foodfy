CREATE TABLE "files" (
  "id" serial PRIMARY KEY,
  "name" text,
  "path" text NOT NULL
);

CREATE TABLE "recipe_files" (
  "id" serial PRIMARY KEY,
  "recipe_id" int NOT NULL,
  "file_id" int NOT NULL
);

CREATE TABLE "recipes" (
  "id" serial PRIMARY KEY,
  "chef_id" int NOT NULL,
  "image" text,
  "title" text,
  "ingredients" text[],
  "preparation" text[],
  "information" text,
  "created_at" timestamp DEFAULT (now())
);

ALTER TABLE "recipes" ADD COLUMN "updated_at" timestamp DEFAULT (now())
ALTER TABLE "recipes" ALTER "created_at" SET DEFAULT (now())

ALTER TABLE "recipe_files" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id");

ALTER TABLE "recipe_files" ADD FOREIGN KEY ("file_id") REFERENCES "files" ("id");

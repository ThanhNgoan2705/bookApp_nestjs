gen_db:
	npx prisma migrate dev --name init

gen_db_code:

	npx prisma generate
	npx prisma migrate dev --name init

update_db:
	

update_db_code:
	npx prisma generate

run:
	npm run start:dev

ngrok:
	./ngrok http 3000

.PHONY: up down logs ps seed clean restart

up:
	docker compose up -d

down:
	docker compose down

logs:
	docker compose logs -f

ps:
	docker compose ps

seed:
	docker compose exec -T mongodb mongosh -u admin -p password123 < mongo-init/init-dbs.js

clean:
	docker compose down -v

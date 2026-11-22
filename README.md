# portifyx-dev-env

Centralized local infrastructure and development environment orchestration for the PortifyX microservice platform.

## Services Managed

- **MongoDB 7.0**: Multi-database instance enforcing the Database-per-Service architecture (`portifyx_portfolio`, `portifyx_exchange`, `portifyx_marketdata`, `portifyx_sync`).
- **Redis 7.2**: In-memory caching and transient state management (UniversalClient).
- **RabbitMQ 3.13**: Asynchronous message broker with Management UI (`http://localhost:15672`).

## Quickstart

```bash
# Start all infrastructure in the background
make up

# View container health and status
make ps

# Follow container logs
make logs

# Stop containers
make down
```

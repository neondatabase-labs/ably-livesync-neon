CREATE OR REPLACE FUNCTION outbox_notify()
RETURNS trigger AS $$
BEGIN
	PERFORM pg_notify('ably_adbc'::text, ''::text);
	RETURN NULL;
EXCEPTION
	-- ensure this function can never throw an uncaught exception
	WHEN others THEN
		RAISE WARNING 'unexpected error in %s: %%', SQLERRM;
		RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER outbox_trigger
AFTER INSERT ON outbox
FOR EACH STATEMENT EXECUTE PROCEDURE
outbox_notify();

-- This is an empty migration.

-- for some reason we can't index with GIST
CREATE INDEX "images.p_hash_2" ON images(p_hash_2);

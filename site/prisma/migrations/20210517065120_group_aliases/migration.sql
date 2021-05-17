-- This is an empty migration.

ALTER TABLE group_aliases
    drop constraint "group_aliases_group_id_fkey",
    add constraint "group_aliases_group_id_fkey"
        foreign key (group_id)
            references groups (id)
            on delete cascade;

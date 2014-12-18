// adding test user, bob
insert into users(username, password, avatar, token) values ('a1', 'b', 'c', 'd');
insert into users(username, password, avatar, token) values ('a2', 'b', 'c', 'd');
insert into users(username, password, avatar, token) values ('a3', 'b', 'c', 'd');

delete from users;

insert into users (id, username, password, avatar, token) values (1, 'bob','$2a$08$LQ0Zwfk5.r5OdYWeGkd/K.GX3rd.XUxy2lFpDeyZLiS2xSlDDgO2q', 'a.png', 'tok');

//adding test note
insert into notes(title, body, user_id) values ('a1', 'b', 1);
insert into notes(title, body, user_id) values ('a2', 'b', 1);
insert into notes(title, body, user_id) values ('a3', 'b', 1);

delete from notes;

insert into notes(id, title, body, user_id) values (1, 'title', 'body', 1);
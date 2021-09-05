/* drop, create and use new database */
DROP DATABASE IF EXISTS myworkspace_db;

CREATE DATABASE myworkspace_db;

USE myworkspace_db;


/* creating tables */
CREATE TABLE `users` (
	`id` integer NOT NULL AUTO_INCREMENT,
	`name` varchar(85) NOT NULL,
	`email` varchar(60) NOT NULL,
	`password` varchar(18) NOT NULL,
	`phone` varchar(14),
	`cpf` varchar(18),
	`uf` varchar(2),
	`preferences` integer NOT NULL,
	`created_at` date,
	`updated_at` date,

	PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8;

/* data insertion */
INSERT INTO `users`(`id`, `name`, `email`, `password`, `phone`, `cpf`, `uf`, `preferences`, `created_at`, `updated_at`)
VALUES (1, "Alvaro", "alvaro-alves@nomail.edu", "senha_da_nasa123", "27999999999", "000.123.111-60", "BA", 1, "2021-12-25", "2020-11-09");


CREATE TABLE `user_preferences` (
	`id` integer NOT NULL AUTO_INCREMENT,
	`user_id` integer NOT NULL,
	`image_path` varchar(255),
	`default_theme` integer(1),

	PRIMARY KEY (`id`),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
) DEFAULT CHARSET=utf8;

INSERT INTO `user_preferences`(`user_id`, `image_path`, `default_theme`)
VALUES (1, "./aqui/essa.png", 2);


/* adding foreign key */
ALTER TABLE `users` ADD FOREIGN KEY (`preferences`) REFERENCES `user_preferences`(`id`);


CREATE TABLE `projects` (
	`id` integer NOT NULL AUTO_INCREMENT,
	`user_id` integer NOT NULL,
	`name` varchar(100) NOT NULL,

	PRIMARY KEY (`id`),
	FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) DEFAULT CHARSET=utf8;


CREATE TABLE `proj_tasks` (
	`id` integer NOT NULL AUTO_INCREMENT,
	`proj_id` integer NOT NULL,
	`task_num` integer(2) NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` varchar(355) NOT NULL,
	`deadline` date,
	`situation` integer,
	`was_finished` boolean,

	PRIMARY KEY (`id`),
	FOREIGN KEY (`proj_id`) REFERENCES `projects` (`id`)
) DEFAULT CHARSET=utf8;


CREATE TABLE `tasks` (
	`id` integer NOT NULL AUTO_INCREMENT,
	`user_id` integer NOT NULL,
	`name` varchar(100) NOT NULL,
	`deadline_date` date,
	`deadline_time` time,
	`description` varchar(355),
	`created_at` date,
	`updated_at` date,

	PRIMARY KEY (`id`),
	FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) DEFAULT CHARSET=utf8;


CREATE TABLE `bibliography` (
	`id` integer NOT NULL AUTO_INCREMENT,
	`user_id` integer NOT NULL,
	`author` varchar(85) NOT NULL,
	`name` varchar(325) NOT NULL,
	`publication_date` date NOT NULL,
	`created_at` date,

	PRIMARY KEY (`id`),
	FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) DEFAULT CHARSET=utf8;


INSERT INTO `projects`(`id`, `user_id`, `name`)
VALUES (1, 1, "Construir um App");

INSERT INTO `proj_tasks`(`id`, `proj_id`, `task_num`, `name`, `description`, `deadline`, `situation`, `was_finished`)
VALUES (2, 1, 02, "Criar Banco de Dados", "Sem database, sem dados. dãã!!!", "2021-09-25", 3, 1);

INSERT INTO `tasks`(`id`, `user_id`, `name`, `deadline_date`, `deadline_time`, `description`, `created_at`, `updated_at`)
VALUES (2, 1, "Aplicar P4", "2021-09-24", "04:23:10.0000002", "Espero que todos tirem 10!", "2021-09-01", "2021-09-02");

INSERT INTO `bibliography`(`id`, `user_id`, `author`, `name`, `publication_date`, `created_at`)
VALUES (1, 1, "Alan Turing", "Máquinas Podem Pensar?", "1957-10-01", "2021-12-10");


/* dataset view */
SELECT * FROM `users`;
SELECT * FROM `user_preferences`;
SELECT * FROM `projects`;
SELECT * FROM `proj_tasks`;
SELECT * FROM `tasks`;
SELECT * FROM `bibliography`;


create type ROLE as enum('user', 'admin', 'super_admin');
create type MEMORY_UNIT as enum('GB', 'TB');

create table user_profile(
  user_id UUID primary key,
  email varchar(225) not null unique,
  role ROLE not null default 'user',
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp,

  foreign key(user_id) references auth.users(id)
    on delete cascade
    on update cascade
);

create table plans(
  plan_id varchar(20) primary key,
  plan_name varchar(20) not null,
  storage_limit int default 0,
  memory_unit MEMORY_UNIT NOT NULL,
  currency char(3) default null,
  price int not null default 0,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp,
  nation_id char(3)

);

create table nations(
  nation_id char(3) primary key,
  nation_name varchar(32) not null,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp
);

create table owned_plan(
  user_id UUID primary key,
  plan_id varchar(20) not null unique,
  start_date date not null default current_timestamp,
  end_date date not null,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp
);

create table folders(
  folder_id UUID primary key default gen_random_uuid(),
  parent_id UUID unique default null,
  created_by UUID unique not null,
  folder_name varchar(255) not null,
  is_public boolean not null default false,
  is_deleted boolean not null default false,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp
);

create table files(
  file_id UUID PRIMARY KEY default gen_random_uuid(),
  created_by UUID not null unique,
  storage_path text default null,
  file_name varchar(100) not null,
  mime_type varchar(64) not null,
  file_size bigint not null,
  is_deleted boolean not null default false,
  uploaded_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp,
  folder_id UUID not null unique
);

create table file_permissions(
  file_id UUID primary key,
  allow_share boolean not null default false,
  is_locked boolean not null default false,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp
);

create table shared_files(
  id UUID primary key default gen_random_uuid(),
  file_id UUID not null unique,
  shared_by UUID not null unique,
  shared_to UUID not null unique,
  shared_link_token text unique,
  expired_at date default null,
  shared_at timestamp default current_timestamp
);

create table user_storage_used(
  user_id UUID primary key,
  used_byte bigint not null default 0,
  updated_at timestamp default current_timestamp
);

----------------------ADD FOREGIN KEY-----------------------
alter table plans
add constraint fk_to_nation_id
foreign key(nation_id) references nations(nation_id)
on delete cascade
on update cascade;

alter table owned_plan
add constraint fk_to_auth_id
foreign key(user_id) references auth.users(id)
on delete cascade
on update cascade;

alter table owned_plan
add constraint fk_to_plan_id
foreign key(plan_id) references plans(plan_id)
on delete cascade
on update cascade;

alter table user_storage_used
add constraint fk_to_auth_id
foreign key(user_id) references auth.users(id)
on delete cascade
on update cascade;

alter table folders
add constraint fk_to_folder_id
foreign key(parent_id) references folders(folder_id)
on delete cascade
on update cascade;

alter table folders
add constraint fk_to_auth_id
foreign key(created_by) references auth.users(id)
on delete cascade
on update cascade;

alter table files
add constraint fk_to_auth_id
foreign key(created_by) references auth.users(id)
on delete cascade
on update cascade;

alter table files
add constraint fk_to_folder_id
foreign key(folder_id) references folders(folder_id)
on delete cascade
on update cascade;

alter table file_permissions
add constraint fk_to_file_id
foreign key(file_id) references files(file_id)
on delete cascade
on update cascade;

alter table shared_files
add constraint fk_to_file_id
foreign key(file_id) references files(file_id)
on delete cascade
on update cascade;

alter table shared_files
add constraint fk_shared_by_to_auth_id
foreign key(shared_by) references auth.users(id)
on delete cascade
on update cascade;

alter table shared_files
add constraint fk_shared_to_to_auth_id
foreign key(shared_to) references auth.users(id)
on delete cascade
on update cascade;
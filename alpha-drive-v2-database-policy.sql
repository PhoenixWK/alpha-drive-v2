--CREATE POLICIES FOR 'user_porfile' table--

create policy "only user able to view its profile"
on user_profile
for select
to authenticated
using(auth.uid() = user_id);

create policy "only user able to modify its profile"
on user_profile
for insert
to authenticated
with check(
  user_id=auth.uid() and role!='admin'
);

create policy "only user able to update its profile"
on user_profile
for update
to authenticated
with check(
  user_id=auth.uid() and role!='admin'
);

create policy "only user able to delete its profile"
on user_profile
for delete
to authenticated
using(
  user_id=auth.uid() and role!='admin'
);


--CREATE POLICIES FOR 'plans' table--

create policy "super admin and admin are able to view the service's plans"
on plans
for select
to authenticated
using (
  exists (
    select 1 
    from user_profile
    where user_id=auth.uid() and (role='super_admin' or role='admin')
  )
);

create policy "only super admin are able to create new service's plans"
on plans 
for insert
to authenticated
with check (
  exists (
    select 1 
    from user_profile
    where user_id=auth.uid() and role='super_admin'
  )
);

create policy "only super admin are able to update the existing service's plans"
on plans 
for update
to authenticated
with check (
  exists (
    select 1 
    from user_profile
    where user_id=auth.uid() and role='super_admin'
  )
);

create policy "only super admin are able to delete the existing service's plans"
on plans 
for delete
to authenticated
using (
  exists (
    select 1 
    from user_profile
    where user_id=auth.uid() and role='super_admin'
  )
);

--CREATE POLICY FOR 'nations' table--
create policy "super admin and admin are able to view rows"
on nations
for select
to authenticated 
using (
  exists(
    select 1 
    from user_profile
    where user_id=auth.uid() and (role='super_admin' or role='admin')
  )
);

create policy "only super admin are able to insert new the nations"
on nations
for insert
to authenticated
with check (
  exists (
    select 1 
    from user_profile 
    where user_id=auth.uid() and role='super_admin'
  )
);

create policy "only super admin are able to update the existing nations"
on nations
for update
to authenticated
with check (
  exists (
    select 1 
    from user_profile 
    where user_id=auth.uid() and role='super_admin'
  )
);

create policy "only super admin are able to delete the existing nations"
on nations
for delete
to authenticated
using (
  exists (
    select 1 
    from user_profile 
    where user_id=auth.uid() and role='super_admin'
  )
);

--CREATE POLICY FOR 'owned_plan' table--
create policy "users can view their owned plan"
on owned_plan
for select
to authenticated
using (
  exists (
    select 1 
    from user_profile
    where (
      user_profile.user_id=auth.uid()
      and user_profile.user_id=owned_plan.user_id 
      and role='user'
    )
  )
);

create policy "admins can view the users' owned plan"
on owned_plan
for select
to authenticated
using (
  exists (
    select 1 
    from user_profile 
    where user_id=auth.uid() and role='admin'
  )
);

create policy "users can apply heir owned plan"
on owned_plan
for insert
to authenticated
with check (
  auth.uid()=user_id or
  exists(
    select 1 
    from user_profile
    where user_profile.user_id=auth.uid()
      and user_profile.user_id=owned_plan.user_id 
      and role='user'
  )
);

create policy "users can update their owned plan"
on owned_plan
for update 
to authenticated
with check (
  exists(
    select 1 
    from user_profile
    where user_profile.user_id=auth.uid()
      and user_profile.user_id=owned_plan.user_id 
      and role='user'
  )
);

create policy "users can delete their owned plan"
on owned_plan
for delete
to authenticated
using (
  exists(
    select 1 
    from user_profile
    where user_profile.user_id=auth.uid()
      and user_profile.user_id=owned_plan.user_id 
      and role='user'
  )
);

--CREATE POLICY FOR 'user_storage_used' table--
create policy "users can view their used storage"
on user_storage_used
for select
to authenticated
using (
  exists (
    select 1 
    from user_profile
    where user_profile.user_id=auth.uid()
      and user_profile.user_id=user_storage_used.user_id 
      and role='user'
  )
);

create policy "admins can view the users' used storage"
on user_storage_used
for select
to authenticated
using (
  exists (
    select 1 
    from user_profile
    where user_profile.user_id=auth.uid()
      and role='admin'
  )
);

create policy "users can insert their used storage"
on user_storage_used
for insert
to authenticated
with check (
  exists (
    select 1 
    from user_profile
    where user_profile.user_id=auth.uid()
      and user_profile.user_id=user_storage_used.user_id 
      and role='user'
  )
);

create policy "users can update their used storage"
on user_storage_used
for update
to authenticated
with check (
  exists (
    select 1 
    from user_profile
    where user_profile.user_id=auth.uid()
      and user_profile.user_id=user_storage_used.user_id 
      and role='user'
  )
);

create policy "users can delete their used storage"
on user_storage_used
for delete
to authenticated
using (
  exists (
    select 1 
    from user_profile
    where user_profile.user_id=auth.uid()
      and user_profile.user_id=user_storage_used.user_id 
      and role='user'
  )
);

--CREATE POLICY FOR 'files' table--
create policy "users are able to view their files"
on files
for select
to authenticated
using (
  exists (
    select 1 
    from user_profile up
    join files f on f.owner_id=up.user_id
    where up.user_id=auth.uid() and role='user'
  )
);

create policy "users are able to insert their new files"
on files
for insert
to authenticated
with check (
  exists (
    select 1 
    from user_profile up
    join files f on f.owner_id=up.user_id
    where up.user_id=auth.uid() and role='user'
  )
);

create policy "users are able to update their existing files"
on files
for update
to authenticated
with check (
  exists (
    select 1 
    from user_profile up
    join files f on f.owner_id=up.user_id
    where up.user_id=auth.uid() and role='user'
  )
);

create policy "users are able to delete their existing files"
on files
for delete
to authenticated
using (
  exists (
    select 1 
    from user_profile up
    join files f on f.owner_id=up.user_id
    where up.user_id=auth.uid() and role='user'
  )
);

--CREATE POLICY FOR 'workspace' table--
create policy "users can manage their workspace"
on workspace
for all
to authenticated
using (
  exists (
    select 1 
    from user_profile up
    join workspace w on w.owner_id=up.user_id
    where up.user_id=auth.uid() and role='user'
  )
);

--CREATE POLICY FOR 'shared_file' table--
create policy "user is allowed to manage their shared files"
on shared_files
for all
to authenticated
using(
  exists (
    select 1 
    from user_profile up
    join shared_files sf on sf.shared_by=up.user_id
    where up.user_id=auth.uid() and role='user'
  )
)
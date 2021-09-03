SELECT id AS post_id, title, content, img, author_id, date_created, username AS author_username
FROM helo_posts
JOIN helo_posts ON helo_users
WHERE lower(title)
LIKE $1
ORDER BY date_created DESC;
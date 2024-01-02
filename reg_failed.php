<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Regisztráció</title>
    <link rel="stylesheet" type="text/css" href="reg_style.css" />
</head>
<body>
    <h1>A felhasználónév már foglalt</h1>
    <form action="handle_registration.php" method="post">
        <label for="username">Felhasználónév:</label>
        <input type="text" name="username" id="username" required><br>
        <label for="password">Jelszó:</label>
        <input type="password" name="password" id="password" required><br>
        <input type="submit" value="Regisztráció">
    </form>
</body>
</html>
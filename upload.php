<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $targetDir = "Photos/";
    $targetFile = $targetDir . basename($_FILES["photo"]["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

    // Verificar si la imagen es un archivo real
    if (isset($_POST["submit"])) {
        $check = getimagesize($_FILES["photo"]["tmp_name"]);
        if ($check !== false) {
            echo "El archivo es una imagen - " . $check["mime"] . ".";
        } else {
            echo "El archivo no es una imagen.";
            $uploadOk = 0;
        }
    }

    // Verificar si el archivo ya existe
    if (file_exists($targetFile)) {
        echo "Lo siento, el archivo ya existe.";
        $uploadOk = 0;
    }

    // Limitar el tamaño del archivo
    if ($_FILES["photo"]["size"] > 500000) {
        echo "Lo siento, tu archivo es demasiado grande.";
        $uploadOk = 0;
    }

    // Permitir solo ciertos formatos de imagen
    if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif") {
        echo "Lo siento, solo se permiten archivos JPG, JPEG, PNG y GIF.";
        $uploadOk = 0;
    }

    // Verificar si $uploadOk es 0 por un error
    if ($uploadOk == 0) {
        echo "Lo siento, tu archivo no ha sido subido.";
    } else {
        if (move_uploaded_file($_FILES["photo"]["tmp_name"], $targetFile)) {
            echo "El archivo ". htmlspecialchars(basename($_FILES["photo"]["name"])) . " ha sido subido.";
        } else {
            echo "Lo siento, ha habido un error al subir tu archivo.";
        }
    }
}
?>

<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'PHPMailer/Exception.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST["nome"];
    $email = $_POST["email"];
    $empresa = $_POST["empresa"];
    $cidade = $_POST["cidade"];
    $servico = $_POST["servico"];
    $mensagem = $_POST["mensagem"];

    $mail = new PHPMailer(true);

    try {
        // CONFIGURAÇÕES SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'gdbgustavoborborema@gmail.com'; // <- SEU EMAIL AQUI
        $mail->Password = 'awlf mqow wgfz iuvf';        // <- SENHA DE APP
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // REMETENTE e DESTINATÁRIO
        $mail->setFrom($email, $nome);
        $mail->addAddress('gdbgustavoborborema@gmail.com'); // <- PARA QUEM SERÁ ENVIADO

        // CONTEÚDO
        $mail->isHTML(true);
        $mail->Subject = "Novo orçamento de $nome";
        $mail->Body = "
            <strong>Nome:</strong> $nome<br>
            <strong>Email:</strong> $email<br>
            <strong>Empresa:</strong> $empresa<br>
            <strong>Cidade:</strong> $cidade<br>
            <strong>Serviço desejado:</strong> $servico<br>
            <strong>Mensagem:</strong><br>$mensagem
        ";

        $mail->send();
        echo "Formulário enviado com sucesso!";
    } catch (Exception $e) {
        echo "Erro ao enviar: {$mail->ErrorInfo}";
    }
}
?>
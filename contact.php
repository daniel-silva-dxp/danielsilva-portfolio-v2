<?php

if(isset($_POST['c_email'])){

	$name = $_POST['c_name'];
	$email = $_POST['c_email'];
	$message = $_POST['c_message'];
	$layout = $_POST['c_sim'];
	 
	if($layout == '') {
		$layout = 'Não';
	}
	
	$to      = "contato@danielsilva-dev.com.br";
	$subject = '[CONTATO] - Website Portfólio';
	$body = '';
	$body = "Prezado,\r\n";
	$body .= "\r\n";
	$body .= "Meu nome é ".$name ."\r\n";
	$body .= "Meu e-mail é ".$email ."\r\n";
	$body .= "Possuo layout? ".$layout ."\r\n";
	$body .= "Eu tenho uma mensagem pra você, ".$message ."\r\n";
	$body .= "\r\n";
	$body .= "Atenciosamente,\r\n";
	$body .= $name."\r\n";

	$headers = "MIME-Version: 1.1\r\n";
	$headers .= "Content-type: text/plain; charset=UTF-8\r\n";
	$headers .= "From: contato@danielsilva-dev.com.br\r\n"; // remetente
	$headers .= "Return-Path: contato@danielsilva-dev.com.br\r\n"; // return-path

	if(!mail($to, $subject, $body, $headers ,"-r".$to)){ // Se for Postfix
			$status = mail($to, $subject, $body, $headers);
	}

	$status = mail($to, $subject, $body, $headers);

	if($status == TRUE){	
		// $res['sendstatus'] = 'done';
	
		// //Edit your message here
		// $res['message'] = 'Form Submission Successful';
		header('location:obrigado.html');
  } else{
		header('location:falha.html');
	}
	
	
	echo json_encode($res);
}

?>
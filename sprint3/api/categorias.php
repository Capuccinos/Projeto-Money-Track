<?php
require_once '../config/db.php';

$metodo = $_SERVER['REQUEST_METHOD'];
$acao = $_GET['acao'] ?? '';
$resposta = ['sucesso' => false, 'mensagem' => ''];

try {
    switch ($acao) {
        case 'adicionar':
            if ($metodo === 'POST') {
                $dados = json_decode(file_get_contents('php://input'), true);
                $nome = trim($dados['nome'] ?? '');
                $tipo = trim($dados['tipo'] ?? 'ambas');

                if ($nome === '') {
                    $resposta['erro'] = 'O nome da categoria é obrigatório.';
                    break;
                }

                $sql = "INSERT INTO categorias (nome, tipo) VALUES (?, ?)";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param('ss', $nome, $tipo);

                if ($stmt->execute()) {
                    $resposta['sucesso'] = true;
                    $resposta['mensagem'] = 'Categoria salva com sucesso!';
                    $resposta['id'] = $conn->insert_id;
                } else {
                    $resposta['erro'] = $stmt->error;
                }
                $stmt->close();
            }
            break;
        case 'listar':
            if ($metodo === 'GET') {
                $sql = "SELECT id, nome, tipo FROM categorias ORDER BY nome";
                $resultado = $conn->query($sql);
                if ($resultado) {
                    $categorias = [];
                    while ($row = $resultado->fetch_assoc()) {
                        $categorias[] = $row;
                    }
                    $resposta['sucesso'] = true;
                    $resposta['dados'] = $categorias;
                }
            }
            break;
        case 'deletar':
            if ($metodo === 'POST') {
                $dados = json_decode(file_get_contents('php://input'), true);
                $id = intval($dados['id'] ?? 0);
                if ($id > 0) {
                    $sql = "DELETE FROM categorias WHERE id = ?";
                    $stmt = $conn->prepare($sql);
                    $stmt->bind_param('i', $id);
                    if ($stmt->execute()) {
                        $resposta['sucesso'] = true;
                        $resposta['mensagem'] = 'Categoria removida com sucesso!';
                    } else {
                        $resposta['erro'] = $stmt->error;
                    }
                    $stmt->close();
                } else {
                    $resposta['erro'] = 'ID de categoria inválido.';
                }
            }
            break;
        default:
            $resposta['erro'] = 'Ação não definida';
    }
} catch (Exception $e) {
    $resposta['erro'] = $e->getMessage();
}

echo json_encode($resposta);
$conn->close();
?>
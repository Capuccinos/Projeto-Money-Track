<?php
require_once '../config/db.php';

$metodo = $_SERVER['REQUEST_METHOD'];
$acao = $_GET['acao'] ?? '';

// Resposta padrão
$resposta = ['sucesso' => false, 'mensagem' => ''];

try {
    switch ($acao) {
        case 'adicionar':
            if ($metodo === 'POST') {
                $dados = json_decode(file_get_contents('php://input'), true);
                
                $sql = "INSERT INTO receitas (descricao, valor, data_mov, categoria) 
                        VALUES (?, ?, ?, ?)";
                
                $stmt = $conn->prepare($sql);
                $stmt->bind_param(
                    'sdss',
                    $dados['descricao'],
                    $dados['valor'],
                    $dados['data_mov'],
                    $dados['categoria']
                );
                
                if ($stmt->execute()) {
                    $resposta['sucesso'] = true;
                    $resposta['mensagem'] = 'Receita salva com sucesso!';
                    $resposta['id'] = $conn->insert_id;
                } else {
                    $resposta['erro'] = $stmt->error;
                }
                $stmt->close();
            }
            break;

        case 'listar':
            if ($metodo === 'GET') {
                $limite = $_GET['limite'] ?? 5;
                
                $sql = "SELECT * FROM receitas ORDER BY data_mov DESC LIMIT ?";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param('i', $limite);
                $stmt->execute();
                $resultado = $stmt->get_result();
                
                $receitas = [];
                while ($row = $resultado->fetch_assoc()) {
                    $receitas[] = $row;
                }
                
                $resposta['sucesso'] = true;
                $resposta['dados'] = $receitas;
                $stmt->close();
            }
            break;

        case 'total':
            if ($metodo === 'GET') {
                $sql = "SELECT SUM(valor) as total FROM receitas";
                $resultado = $conn->query($sql);
                
                if ($resultado) {
                    $row = $resultado->fetch_assoc();
                    $resposta['sucesso'] = true;
                    $resposta['total'] = $row['total'] ?? 0;
                }
            }
            break;

        case 'deletar':
            if ($metodo === 'POST') {
                $dados = json_decode(file_get_contents('php://input'), true);
                $id = $dados['id'] ?? 0;
                
                $sql = "DELETE FROM receitas WHERE id = ?";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param('i', $id);
                
                if ($stmt->execute()) {
                    $resposta['sucesso'] = true;
                    $resposta['mensagem'] = 'Receita deletada com sucesso!';
                } else {
                    $resposta['erro'] = $stmt->error;
                }
                $stmt->close();
            }
            break;

        case 'categorias':
            if ($metodo === 'GET') {
                $sql = "SELECT id, nome FROM categorias ORDER BY nome";
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

        default:
            $resposta['erro'] = 'Ação não definida';
    }
} catch (Exception $e) {
    $resposta['erro'] = $e->getMessage();
}

echo json_encode($resposta);
$conn->close();
?>

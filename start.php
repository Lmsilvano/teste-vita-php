<?php
require_once 'bootstrap.php';
header('Content-Type: application/json');
use App\Migrations\Amostra;
use App\Models\Amostra as AmostraModel;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $amostra = new Amostra();
        $amostra->up();
        $dataArray = [
            'amostranum' => $_POST['amostranum'],
            'esp1' => $_POST['esp1'],
            'esp2' => $_POST['esp2'],
            'esp3' => $_POST['esp3'],
            'esp4' => $_POST['esp4'],
            'esp5' => $_POST['esp5'],
        ];
        $amostraModel = new AmostraModel();
        $amostraModel->numerodeamostra = $dataArray['amostranum'];
        $amostraModel->especie_1 = $dataArray['esp1'];
        $amostraModel->especie_2 = $dataArray['esp2'];
        $amostraModel->especie_3 = $dataArray['esp3'];
        $amostraModel->especie_4 = $dataArray['esp4'];
        $amostraModel->especie_5 = $dataArray['esp5'];
        $amostraModel->save();

        //$method = strtolower($_SERVER['REQUEST_METHOD']);

        http_response_code(201);
        echo json_encode(['status' => 'sucess', 'data' => $dataArray]);
        exit();
    } catch (\Exception $e) {
        try {
            $dataArray = [
                'amostranum' => $_POST['amostranum'],
                'esp1' => $_POST['esp1'],
                'esp2' => $_POST['esp2'],
                'esp3' => $_POST['esp3'],
                'esp4' => $_POST['esp4'],
                'esp5' => $_POST['esp5'],
            ];
            $amostraModel = new AmostraModel();
            $amostraModel->numerodeamostra = $dataArray['amostranum'];
            $amostraModel->especie_1 = $dataArray['esp1'];
            $amostraModel->especie_2 = $dataArray['esp2'];
            $amostraModel->especie_3 = $dataArray['esp3'];
            $amostraModel->especie_4 = $dataArray['esp4'];
            $amostraModel->especie_5 = $dataArray['esp5'];
            $amostraModel->save();
            http_response_code(201);
            echo json_encode(['status' => 'sucess', 'data' => $dataArray]);
            exit();
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(
                ['status' => 'error', 'data' => $e->getMessage()],
                JSON_UNESCAPED_UNICODE
            );
            exit();
        }
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $amostra = new AmostraModel();
        $amostraModel = AmostraModel::all();
        http_response_code(200);
        echo json_encode(['status' => 'sucess', 'data' => $amostraModel]);
        exit();
    } catch (\Exception $e) {
        http_response_code(500);
        echo json_encode(
            ['status' => 'error', 'data' => $e->getMessage()],
            JSON_UNESCAPED_UNICODE
        );
        exit();
    }
}
?>

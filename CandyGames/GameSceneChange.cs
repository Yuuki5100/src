using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class GameSceneChange : MonoBehaviour
{
    //スコアスクリプト取得
    public Score Score;

    public void Onclick()
    {
        //シーンチェンジ
        SceneManager.LoadScene("GameScene");

        //スコアリセット
        Score.ResetScore();
    }
}

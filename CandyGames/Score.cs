using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Score : MonoBehaviour
{
    public Text scoreboard;
    public static int score;

    //スコアの変数
    public static int InstanceScore()
    {
        return score;
    }

    public void ResetScore()
    {
        score = 0;
    }

    void OnTriggerEnter(Collider other)
    {        
        //スコアを計算
        score += 20;
    }

    // Update is called once per frame
    void Update()
    {
        scoreboard.text = "Score : " + score.ToString();
    }
}

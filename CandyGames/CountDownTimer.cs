using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class CountDownTimer : MonoBehaviour
{
    public Text timerText;
    //トータル制限時間
    public float totalTime;

    //制限時間(秒)
    int seconds;

    // Start is called before the first frame update
    void Start()
    {

    } 

    void Update()
    {
        totalTime -= Time.deltaTime;
        seconds = (int)totalTime;
        timerText.text = "残り時間 :" + seconds.ToString();

        if (seconds == 0)
        {
            SceneManager.LoadScene("ClearScene");
        }

    }
}

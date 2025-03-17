using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class ReviewManager : MonoBehaviour
{
    public Text scoreboard;
    public Text Review;
    public int reviewScore;

    public AudioClip sound1;
    public AudioClip sound2;
    public AudioClip sound3;
    public AudioClip sound4;

    AudioSource audioSource;

    // Start is called before the first frame update
    void Start()
    {       
        reviewScore = Score.InstanceScore();
        audioSource = GetComponent<AudioSource>();

        //スコア判定
        reviewSpace();
    }

    // Update is called once per frame
    void Update()
    {
        //スコア出力
        scoreboard.text = reviewScore + "点です".ToString();
    }

    void reviewSpace()
    {
        if (reviewScore > 300)
        {
            Review.text = "うますぎ".ToString();
            audioSource.PlayOneShot(sound1);
            
        }
        else if (reviewScore < 300 && reviewScore > 150)
        {
            Review.text = "遊び程度にやってたんだね".ToString();
            audioSource.PlayOneShot(sound2);
        }
        else if (reviewScore < 150 && reviewScore != 0)
        {
            Review.text = "もっと遊んでいいんだよ？";
            audioSource.PlayOneShot(sound3);
        }
        else
        {
            Review.text = "居眠りゲームは犯罪だぞ！";
            audioSource.PlayOneShot(sound4);
        }
    }
}

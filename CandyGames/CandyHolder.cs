using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class CandyHolder : MonoBehaviour
{
    public Text candyStock;

    const int DefaultCandyAmount = 30;
    const int RecoverSeconds = 10;

    //現在のキャンディのストック数
    int candy = DefaultCandyAmount;

    //ストック回線までの残り秒数
    int counter;

    public void ConsumeCandy()
    {
        if (candy > 0) candy--;
    }

    public int GetCandyAmount()
    {
        return candy;
    }

    public void AddCandy(int amount)
    {
        candy += amount;
    }

    void Update()
    {
        //キャンディのストックがデフォルトより少なく
        //回復カウントをしていないときにカウントをスタートさせる
        if(candy < DefaultCandyAmount && counter <= 0)
        {
            StartCoroutine(RecoverCandy());
        }

        //キャンディのストック数を表示
        //回復カウントしている時だけ秒数を表示
        candyStock.text = "残りCandy : " + candy + "　".ToString() 
            + "Reload : " + counter;
    }

    IEnumerator RecoverCandy()
    {
        counter = RecoverSeconds;

        //1秒ずつカウントを進める
        while(counter > 0)
        {
            yield return new WaitForSeconds(1.0f);
            counter--;
        }

        candy++;
    }
}

using System.Collections;
using System.Collections.Generic;
using UnityEngine;


public class CandyDestroyer : MonoBehaviour
{
    public CandyHolder candyholder;
    public int reward;
    public GameObject effectPrefab;
    public Vector3 effectRotation;

    void OnTriggerEnter(Collider other)
    {
        if(other.gameObject.tag == "candy")
        {
            //指定数だけCandyのストックを増やす
            candyholder.AddCandy(reward);

            Destroy(other.gameObject);

            if(effectPrefab != null)
            {
                //Candyのポジションにエフェクトを生成
                Instantiate(
                    effectPrefab,
                    other.transform.position,
                    Quaternion.Euler(effectRotation)
                );
            }
        }
    }
}

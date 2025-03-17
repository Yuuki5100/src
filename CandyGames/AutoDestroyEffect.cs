using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class AutoDestroyEffect : MonoBehaviour
{
    ParticleSystem particle;

    // Start is called before the first frame update
    void Start()
    {
        particle = GetComponent<ParticleSystem>();
    }

    // Update is called once per frame
    public void Update()
    {
        //パーティクルの再生が終了したらGameObjectを削除
        if (particle.isPlaying == false)
        { 
            Destroy(gameObject);
        }
    }
}
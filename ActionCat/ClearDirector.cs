using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class ClearDirector : MonoBehaviour
{
    public AudioClip sound1;
    AudioSource clearsound;

    void Start()
    {
        clearsound = GetComponent<AudioSource>();
        clearsound.PlayOneShot(sound1);
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetMouseButtonDown(0))
        {
            SceneManager.LoadScene("GameScene");
        }
    }
}

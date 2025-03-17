using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class PlayerController : MonoBehaviour
{

    Rigidbody2D rigid2D;
    Animator animator;
    float jumpForce = 340.0f; //ジャンプ距離
    float walkForce = 15.0f;  //歩くスピード
    float maxWalkSpeed = 2.0f; //歩く最大スピード  
    float threshold = 0.2f; //加速度センサの初期値(モバイル)

    //音の変数宣言
    public AudioClip sound1;
    AudioSource audioSource;

    void Start()
    {
        this.rigid2D = GetComponent<Rigidbody2D>();
        this.animator = GetComponent<Animator>();
        audioSource = GetComponent<AudioSource>();
    }

    // Update is called once per frame
    void Update()
    {
        //ジャンプ処理
        if (Input.GetKeyDown(KeyCode.Space) &&
                this.rigid2D.velocity.y == 0)
        {
            this.animator.SetTrigger("JumpTrigger"); //アニメータージャンプの設定
            this.rigid2D.AddForce(transform.up * this.jumpForce);
            audioSource.PlayOneShot(sound1);
        }

        int key = 0;

        //左右移動(モバイル)
        /*if (Input.acceleration.x > this.threshold) key = 1;
        if (Input.acceleration.x < this.threshold) key = -1;*/

        // 左右移動(PC)
        if (Input.GetKey(KeyCode.D)) key = 1;
        if (Input.GetKey(KeyCode.A)) key = -1;

        //プレイヤーの移動
        float speedx = Mathf.Abs(this.rigid2D.velocity.x);

        if (speedx < this.maxWalkSpeed)
        {
            this.rigid2D.AddForce(transform.right * key * this.walkForce);
        }

        if (key != 0)
        {
            transform.localScale = new Vector3(key, 1, 1);
        }

        //プレイヤの速度に応じてアニメーション速度を変える
        if (this.rigid2D.velocity.y == 0)
        {
            this.animator.speed = speedx / 2.0f;
        }
        else
        {
            this.animator.speed = 1.0f;
        }

        //ステージ外に落ちるとやり直し処理
        if (transform.position.y < -10)
        {
            SceneManager.LoadScene("GameScene");
        }
    }

    //クリア画面への移動
    void OnTriggerEnter2D(Collider2D other)
    {
        Debug.Log("ゴール");
        SceneManager.LoadScene("ClearScene");
    }
}
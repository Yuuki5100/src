using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Shooter : MonoBehaviour
{
    const int SphereCandyFrequency = 3;
    const int MaxShotPower = 5;
    const int RecoverySeconds = 3;

    int SampleCandyCount;
    int ShotPower = MaxShotPower;
    AudioSource shotSound;

    public GameObject[] CandyPrefabs;
    public GameObject[] CandySqurePrefabs;
    public GameObject CandyPrefab;
    public CandyHolder CandyHolder;
    public float ShotSpeed;
    public float ShotTorque;
    public float BaseWidth;

    public Text healTime;

    private void Start()
    {
        shotSound = GetComponent<AudioSource>();
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetButtonDown("Fire1")) Shot();
    }

    GameObject SampleCandy()
    {
        GameObject prefab = null;

        //特定の回数に一回丸いキャンディを選択する
        if(SampleCandyCount % SphereCandyFrequency == 0)
        {
            int index = Random.Range(0, CandyPrefabs.Length);
            prefab = CandyPrefabs[index];
        }
        else
        {
            int index = Random.Range(0, CandySqurePrefabs.Length);
            prefab = CandySqurePrefabs[index];
        }

        SampleCandyCount++;

        return prefab;
    }

    Vector3 GetInstantiatePositision()
    {
        //画面サイズとInputの割合からキャンディ生成のポジション計算
        float x = BaseWidth *
            (Input.mousePosition.x / Screen.width) - (BaseWidth / 2);
        return transform.position + new Vector3(x, 0, 0);
    }

    public void Shot()
    {
        //キャンディを生成できる条件外ならばShotしない
        if (CandyHolder.GetCandyAmount() <= 0) return;

        //プレファブからCandyオブジェクトを生成
        GameObject candy = (GameObject)Instantiate(
            SampleCandy(),
            GetInstantiatePositision(),
            Quaternion.identity
        );

        //生成したCandyオブジェクトの親をCandyHolderに設定する
        candy.transform.parent = CandyHolder.transform;

        //CandyオブジェクトのRigidbodyを取得し力と回転を加える
        Rigidbody candyRigidBody = candy.GetComponent<Rigidbody>();
        candyRigidBody.AddForce(transform.forward * ShotSpeed);
        candyRigidBody.AddTorque(new Vector3(0, ShotTorque, 0));

        //Candyのストックを消費
        CandyHolder.ConsumeCandy();
        ConsumePower();

        //サウンドを再生
        shotSound.Play();

        for(int i = 0; i < ShotPower; i++)
        healTime.text = "残りショット :" + ShotPower.ToString();

        void ConsumePower()
        {
            //ShotPowerを消費すると同時に回復のカウントをスタート
            ShotPower--;
            StartCoroutine(RecoverPower());
        }

        IEnumerator RecoverPower()
        {
            //一定秒数待った後にShotPowerを回復
            yield return new WaitForSeconds(RecoverySeconds);
            ShotPower++;
        }
        

    }
}

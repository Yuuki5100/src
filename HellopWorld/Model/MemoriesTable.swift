//
//  MemoriesTable.swift
//  HelloWorld
//
//  Created by 後藤祐希 on 2023/10/21.
//

import Foundation
import RealmSwift

class MemoriesTable: Object,Identifiable{
    
    //ID
    @Persisted var ID = UUID()
    //場所
    @Persisted var place: String = ""
    //名目
    @Persisted var purpose: String = ""
    //日付
    @Persisted var date: Date = Date()
    //画像データ
    @Persisted var imageFile: String = ""
    //備考
    @Persisted var remarks: String = ""
    //Primary Keyの設定
    override static func primaryKey() -> String? {
        return "ID"
    }
}

extension MemoriesTable{
    //取得
    static func select() -> [MemoriesTable]?{
        guard let realm = try? Realm() else { return nil }
        let memories = realm.objects(MemoriesTable.self)
        return Array(memories)
    }
    
    //追加
    static func insert(place:String, purpose:String, imageFile:[UIImage] ,date:Date, remarks:String) -> Bool{
        print(Realm.Configuration.defaultConfiguration.fileURL!)
        //追加するデータの生成
        let memory:MemoriesTable = MemoriesTable(value:
                                                    ["ID"      : UUID(),
                                                     "place"   : place,
                                                     "purpose" : purpose,
                                                     "date"    : date,
                                                     "imageFile" : ImageConvert(imageFile: imageFile),
                                                     "remarks" : remarks,
                                                    ])
        //テーブルにレコードを追加
        guard let realm = try? Realm() else { return false }
        try? realm.write{
            //データの追加
            realm.add(memory, update: .modified)
        }
        return true
    }
    
    //障害でrealmオブジェクトがnilになってしまった場合
    static func errorSaveAdd(){
        print(Realm.Configuration.defaultConfiguration.fileURL!)
        //追加するデータの生成
        let memory:MemoriesTable = MemoriesTable(value:
                                                    ["ID"      : UUID(),
                                                     "place"   : "test",
                                                     "purpose" : "test",
                                                     "date"    : dateFormatConvert(date:"10000101")!,
                                                     "imageFile" : "",
                                                     "remarks" : "test",
                                                    ])
        //テーブルにレコードを追加
        guard let realm = try? Realm() else { return }
        try? realm.write{
            //データの追加
            realm.add(memory, update: .modified)
        }
    }
    //その他のメソッド
    //「文字列型」を「日付型」にするメソッド
    static func dateFormatConvert(date:String) -> Optional<Date>{
        let dateFormatter = DateFormatter()
        //フォーマット設定
        dateFormatter.dateFormat = "yyyyMMdd"
        // ロケール設定（端末の暦設定に引きづられないようにする）
        dateFormatter.locale = Locale(identifier: "en_US_POSIX")
        // タイムゾーン設定（端末設定によらず、どこの地域の時間帯なのかを指定する）
        dateFormatter.timeZone = TimeZone(identifier: "Asia/Tokyo")
        // 変換
        let date = dateFormatter.date(from:date)
        
        return date
    }
    
    static func ImageConvert(imageFile:[UIImage]?) -> String{

        // ファイル名をUUIDで生成し、拡張子を".jpeg"にする
        let fileName = UUID().uuidString + ".jpeg"
        // ドキュメントディレクトリのURLを取得
        let documentsDirectoryURL = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0]
        // ファイルのURLを作成
        let fileURL = documentsDirectoryURL.appendingPathComponent(fileName)
        //画像の初期瀬絵邸をする必要があるか調査する
        let uiimage = imageNilCheck(newlyPickedImage:imageFile)
        // UIImageをJPEGデータに変換
        let data = uiimage.jpegData(compressionQuality: 1.0)
        // JPEGデータをファイルに書き込み
        do {
            try data!.write(to: fileURL)
            print(fileName)
        } catch {
            print("エラー")
        }
        return fileName
    }
    
    //画像が選択されなかった場合、nilで落ちないようUIimageに初期画像を設定するメソッド
    static func imageNilCheck(newlyPickedImage:[UIImage]?) -> UIImage{
        //引数のUIimage配列型をアンラップする
        let unWrapImage = newlyPickedImage!
        
        //コンパイルの関係により、アンラップを行う
//        if let uiimage = newlyPickedImage!.[0]{
//            return uiimage
//        } else {
//            print("画面での画像選択なし")
//        }

        if unWrapImage.count != 0 {
            return unWrapImage[0]
        } else {
            print("画像欄はnilでした")
            return UIImage(named: "no_image_square")!
        }
    }
}

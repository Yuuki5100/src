//
//  MemoriesTableEntity.swift
//  HelloWorld
//
//  Created by 後藤祐希 on 2023/10/24.
//

import Foundation
import UIKit

class MemoriesTableEntity: ObservableObject,Identifiable{
    @Published var id = "2"
    @Published var place = ""
    @Published var purpose = ""
    @Published var date = ""
    @Published var imageFile = ""
    @Published var remarks = ""
    var url: UIImage? = nil
    @IBOutlet var memories: [MemoriesTable]! = []

    init(){
        select()
    }
    
    //取得（初期化で行っている）
    func select(){
        //guard MemoriesTable.select() != nil else { return MemoriesTable.errorSaveAdd()}
        self.memories = MemoriesTable.select()
    }
    
    func insert(place:String, purpose:String,imageFile:[UIImage],date:Date, remarks:String) -> Bool{
        let Flg:Bool = MemoriesTable.insert(place:nilCheck(str: place),
                                            purpose:nilCheck(str:purpose),
                                            imageFile:imageFile,
                                            date: date,
                                            remarks: nilCheck(str:remarks))
        
        return Flg
    }
    
    static let shared = MemoriesTableEntity()
    
    private func nilCheck(str:String) -> String{
//        if str == ""{
//            let str = "空です"
//        }
        return str
    }
}



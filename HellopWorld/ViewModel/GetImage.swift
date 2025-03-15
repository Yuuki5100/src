//
//  GetImage.swift
//  
//
//  Created by 後藤祐希 on 2023/11/11.
//

import Foundation
import UIKit

class GetImage:ObservableObject,Identifiable{
    @Published var id = UUID()
    @Published var url = UIImage()
    
    init(){
        id = UUID()
        url = UIImage()
    }
    
    static let shared = GetImage()
}
